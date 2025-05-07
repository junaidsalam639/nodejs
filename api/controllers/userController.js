export const getUsers = (req, res) => {
    const users = [
        { id: 1, name: "Ali" },
        { id: 2, name: "Sara" },
        { id: 3, name: "Ahmed" },
        { id: 4, name: "Zara" },
        { id: 5, name: "Usman" }
    ];
    res.json(users);
};
