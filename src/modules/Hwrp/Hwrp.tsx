import * as React from 'react';
import {Link} from 'react-router-dom';
import {Upload, Icon, Button} from 'antd';
import { Nav } from '../components/Nav';
import { routes } from '../constants/routes';
import { UploadChangeParam } from 'antd/lib/upload/interface';



export class Hwrp extends React.Component<any, any> {
    state = {
        disabled: false,
        data: {},
        error: {},
        fileName: '',
        fileList: [],
        uploading: false
    }

    handleChange = (info: UploadChangeParam) => {
            console.log(info.file);
    }

    handleUpload = () => {
        const {fileList} = this.state;
    }


    render() {

        const {fileList, uploading} = this.state;
        return (
            <div style={{ minHeight: '100vh', justifyContent: 'flex-start', flexDirection: 'column'}}>
                <Nav>
                    <Link to={routes.HOME}>
                    <Icon type="arrow-left" style={{color: 'white', marginLeft: '.5rem', fontSize: '1.5rem'}}/>
                    </Link>
                
                </Nav>
                <div style={{padding: '5rem', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Upload onChange={this.handleChange} name="file" accept="*" action="http://localhost:3000/hwrp" multiple={false}>
                    <Button type="primary" disabled={this.state.disabled}>
                        <Icon type="upload" /> Select File
                        </Button>
                    </Upload>

                    <Button
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                        >
                        {uploading ? 'Uploading' : 'Start Upload' }
                    </Button>
                </div>
            </div>
        )
    }
}