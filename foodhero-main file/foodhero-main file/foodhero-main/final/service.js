const { storeUser, fetchUserByUserName} = require("./database");


async function userSignUp(user) {

    try {

        const fetchedUser = await fetchUserByUserName({ userName: user.userName });
        if (fetchedUser) {
            return {
                success: false,
                message: "User Already Exist With The Name!",
            };
        }

        const result = await storeUser(user);
        if (result.success) {
            return {
                success: true,
                message: "User Created SuccessFully!",
                id: result.id,

            }
        } else {
            return {
                success: false,
                message: "User Could Not Be Created!"
            }
        }
    } catch (error) {
        throw error;
    }

}
