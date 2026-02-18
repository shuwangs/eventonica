import { useState } from 'react';

const userFrom = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const resetForm = () => {
        setFormData(initialValues);
    }

    return [formData, handleOnChange, resetForm];
}

export default userFrom;