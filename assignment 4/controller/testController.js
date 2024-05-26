const testUserController = (req, res) => {
    try {
        res.status(200).send({ 
            success: true, 
            message: "Test User Controller",
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = { testUserController };
