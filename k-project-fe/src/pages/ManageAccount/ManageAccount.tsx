import './ManageAccount.scss';
import TextFieldWithIcon from '../../controls/TextField/TextFieldWithIcon';
import { faCheck, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import ButtonWithIcon from '../../controls/Button/ButtonWithIcon';
import Loading from '../../controls/Loading/Loading';
import { axiosPOST } from '../../services/axios-services';
import Cookies from 'js-cookie';
import { showToast } from '../../utils/toast-function';
import CustomDatagrid from '../../controls/Datagrid/CustomDatagrid';

const ManageAccount = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <CustomDatagrid />
            <Loading isLoading={isLoading} />
        </>
    );
}
export default ManageAccount;
