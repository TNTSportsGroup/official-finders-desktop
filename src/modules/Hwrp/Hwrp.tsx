import * as React from 'react';
import {Link} from 'react-router-dom';
import {Upload, Icon, Button, Table} from 'antd';
import { Nav } from '../components/Nav';
import { routes } from '../constants/routes';




export class Hwrp extends React.Component<any, any> {
    state = {
        disabled: false,
        data: [],
        error: {},
        fileName: '',
        negativeReport: [],
        showNegativeReport: false
        
    }

    handleChange = (info: any) => {
        
        const {response} = info.file;

        if(response) {
            
            this.setState({
                fileName: response.fileName,
                data: response.userData,
                negativeReport: response.negative 

            })
           
        }
            

            
    }

    


    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: 'Payment',
            dataIndex: 'payment',
            key: 'payment',
          }];

        
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
                        <Icon type="upload" /> Upload File
                        </Button>
                    </Upload>

                    
                </div>

                {this.state.data.length >= 1 && (
                    <div>
                        <Table bordered={true} dataSource={this.state.data} columns={columns}/>
                    </div>
                )}

                {this.state.negativeReport.length >= 1 && (
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <Button>
                        Show Report
                    </Button>


                    </div>
                    
                )}
            </div>
        )
    }
}