
const SettingTemplate = (props) => {
    const { listType, listEmail } = props;
    return (
        <>
            <div >
                <span>Default REGISTER Template</span>
                <span>Current Template: </span>
                <span>
                    {
                        listEmail && listEmail.length > 0 &&
                        listEmail.map((email, index) => {
                            return (
                                email.type === 'REGISTER' ? email.template_name : ''
                            )
                        })
                    }
                </span>
                <select>
                    <option value="">Select Template</option>
                    {
                        listEmail && listEmail.length > 0 &&
                        listEmail.map((email, index) => {
                            return (
                                <option value={email.id}>{email.template_name} - ID: {email.id}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div >
                <span>Default FORGOT_PASSWORD Template</span>
                <span>Current Template: </span>
                <span>
                    {
                        listEmail && listEmail.length > 0 &&
                        listEmail.map((email, index) => {
                            return (
                                email.type === 'FORGOT_PASSWORD' ? email.template_name : ''
                            )
                        })
                    }
                </span>
                <select>
                    <option value="">Select Template</option>
                    {
                        listEmail && listEmail.length > 0 &&
                        listEmail.map((email, index) => {
                            return (
                                <option value={email.id}>{email.template_name} - ID: {email.id}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div >
                <span>Default PAYMENT Template</span>
                <span>Current Template: </span>
                <span>
                    {
                        listEmail && listEmail.length > 0 &&
                        listEmail.map((email, index) => {
                            return (
                                email.type === 'PAYMENT' ? email.template_name : ''
                            )
                        })
                    }
                </span>
                <select>
                    <option value="">Select Template</option>
                    {
                        listEmail && listEmail.length > 0 &&
                        listEmail.map((email, index) => {
                            return (
                                <option value={email.id}>{email.template_name} - ID: {email.id}</option>
                            )
                        })
                    }
                </select>
            </div>
        </>
    );
}

export default SettingTemplate;