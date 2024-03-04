import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from '@faker-js/faker';

const addUsers = createAsyncThunk('users/post', async () => {
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.person.fullName()
    });

    return response.data
});

export { addUsers }