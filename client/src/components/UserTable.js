import React, { useEffect, useState, Component } from 'react'
import Table from 'react-bootstrap/Table';
import UserService from '../service/UserService';

const UserTable = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getAll()
          .then(response => {
            console.log('Printing user data', response.data);
            setUsers(response.data);
          })
          .catch(error => {
            console.log('Something went wrong', error);
          })    
      }, []);

      return (
        <>
            {/*<button onClick={this.retrieveUsers} href="/users">click</button>*/}
            <Table striped responsive="sm" bordered hover>
                
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    {
                        users.map(users => (
                            <tr>
                                <td>{users.id}</td>
                                <td>{users.first}</td>
                                <td>{users.last}</td>
                                <td>{users.username}</td>
                            </tr>
                        ))
                    }
            </Table>    
        </>)
}

export default UserTable;