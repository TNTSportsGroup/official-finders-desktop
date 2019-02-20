import * as React from 'react';
import {Link} from 'react-router-dom';
import {Upload, Icon, Button} from 'antd';
import { Nav } from '../components/Nav';
import { routes } from '../constants/routes';



export class Hwrp extends React.Component<any, any> {


    render() {
        return (
            <div style={{ minHeight: '100vh', justifyContent: 'flex-start', flexDirection: 'column'}}>
                <Nav>
                    <Link to={routes.HOME}>
                    <Icon type="arrow-left" style={{color: 'white', marginLeft: '.5rem', fontSize: '1.5rem'}}/>
                    </Link>
                    
                </Nav>
                <div style={{padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Upload>
                    <Button type="primary">
                        <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                </div>
            </div>
        )
    }
}