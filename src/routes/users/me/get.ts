import { Route, RouteMethods } from '../../../base/Route'
import { checkUserLogged } from '../../../middlewares/userLogged'

export class UsersMeRouteGet extends Route {
    protected method: RouteMethods = 'get'

    constructor () {
        super({
            middlewares: [
                checkUserLogged()
            ]
        })
    }

    init () {
        this.router.use((req, res) => {
            this.dd.controllers.users.getById(req.jwtPayload.userId, {
                email: true,
                firstName: true,
                lastName: true,
                id: true,
                avatarUrl: true
            })
                .then(user => {
                    if (user.code === 200) {
                        res.json(user.data)
                    } else {
                        res.status(user.code).json({ message: user.message })
                    }
                })
        })
    }
}
