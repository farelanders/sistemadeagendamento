import Appointment from "../models/Appointment";
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File'
import { startOfHour, parseISO, isBefore } from 'date-fns';

class AppointmentController{

    async index(req, res){
        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null},
            order: ['date'],
            attributes: ['id', 'date'],
            include:[{
                model: User,
                as: 'collaborator',
                attributes: ['id', 'name'],
                include: [{
                    model: File,
                    as: "foto",
                    attributes: ['path','url'],
                }]
            }]
        })
        return res.json(appointments)
    }

    async store (req, res){
        const schema = Yup.object().shape({
            collaborator_id: Yup.number().required(),
            date: Yup.date().required()
        })

        if (!(await schema.isValid(req.body))){
            return res.status(401).json({error: 'Inválido'})
        }

        const { collaborator_id, date } = req.body;

        const isCollaborator = await User.findOne({
            where: { id: collaborator_id, provider:true }
        })

        if(!isCollaborator){
            return res.status(401).json({error: 'Colaborador não localizado'})
        }

        const startHour = startOfHour(parseISO(date))
        if ( isBefore (startHour, new Date()) ){

            return res.status(400).json({erro: 'Horário não disponível'})

        }

        const checkAvailability = await Appointment.findOne({
            where: {
                collaborator_id,
                canceled_at: null,
                date: startHour
            }
        })
        if ( checkAvailability ){
            return res.status(400).json({erro: 'Horário não disponível para este colaborador'})
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            collaborator_id,
            date: startHour

        })

        return res.json(appointment)
    }
}

export default new AppointmentController