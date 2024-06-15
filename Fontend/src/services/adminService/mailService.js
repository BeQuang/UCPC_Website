import axios from '../../utils/axiosCustomize';

export const fetchTemplateMail = async () => {
    try {
        const response = await axios.get('/getTemplateMail');
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchTypeMail = async () => {

    try {
        const response = await axios.get('/getTypesMail');
        return response;
    } catch (error) {
        return error;
    }
}

export const saveTemplateMail = async (templateName, data) => {
    try {
        const response = await axios.post('/saveTemplateMail', {
            templateName,
            data
        });
        return response;
    } catch (error) {
        return error;
    }
}