import User from '../models/User'
import File from '../models/File'

class CollaboratorController {
    async index(req, res) {
        const collaborator = await User.findAll({ where: { provider: true },
         attributes: ['id', 'name', 'email', 'file_id'],
         include: [{
             model: File,
             as: "foto",
             attributes: ['name', 'path', 'url']
         }]
        })

        return res.json(collaborator)

    }
}

export default new CollaboratorController();