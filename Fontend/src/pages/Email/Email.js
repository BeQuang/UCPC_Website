import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ListMail from './ListMail';
import SettingTemplate from './SettingTemplate';
import { toast } from 'react-toastify';

import {
    fetchTemplateMail
} from '../../services/adminService/mailService';
const Email = () => {


    const [listEmail, setListEmail] = useState([]);
    const [listType, setListType] = useState([]);

    useEffect(() => {
        const fetchTemplate = async () => {
            const response = await fetchTemplateMail();
            if (response && response.EC === 0) {
                setListEmail(response.DT);
            }
        }
        fetchTemplate();

        const fetchType = async () => {
            const response = await fetchTemplateMail();
            if (response && response.EC === 0) {
                setListType(response.DT);
            }
            else {
                toast.error(response.EM)
            }
        }
        fetchType();

    }, [])



    return <div className='col-12 container'>
        <Link className="btn btn-primary my-3" to="/mail-builder">Create Template</Link>
        <Tabs>
            <TabList>
                <Tab>List Template</Tab>
                <Tab>Set Default</Tab>
                <Tab>Sending Mail</Tab>
            </TabList>

            <TabPanel>
                <ListMail
                    listEmail={listEmail}
                />
            </TabPanel>
            <TabPanel>
                <SettingTemplate
                    listEmail={listEmail}
                    listType={listType}
                />
            </TabPanel>
            <TabPanel>
                <h2>Any content 2</h2>
            </TabPanel>
        </Tabs>
    </div>;
}

export default Email;
