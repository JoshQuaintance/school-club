import { userJWT } from '$shared/utils/stores';

export async function post(req) {
    const { action } = req.params;

    if (action == 'setjwt') {
        console.log(userJWT);
    }
}
