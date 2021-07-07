import { connect } from "react-redux";
import React from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { fetchUsers, deleteUsers } from "./redux/action-creators";
import paginationFactory from "react-bootstrap-table2-paginator";


class HomePage extends React.Component {
  
  componentDidMount() {
    this.props.fetchUsers();
  }
  componentDidUpdate() {
    if (this.props.users.error === null){
    this.node.paginationContext.currPage= 1;
    if (localStorage.getItem("Create") === "on" || localStorage.getItem("Update") === "on") {
      this.node.paginationContext.currPage= Number(localStorage.getItem("Page"));
      localStorage.setItem("Create", "off");
      localStorage.setItem("Update", "off");
    }
  } 
  }
  
  handleDelete(id) {
    this.props.deleteUsers(id);
    let totalUsers = this.props.users.data.length;

    //const currentId = this.props.id;
    let pageNumber = parseInt(id / 5) + 1;
        
    localStorage.setItem("Page", pageNumber);
  }

  render() {
    const { SearchBar } = Search;

    const columns = [
      {
        dataField: "firstname",
        text: "First Name",
        style:{'width' : '150px'},
      },
      {
        dataField: "lastname",
        text: "Last Name",
        style:{'width' : '150px'},
      },
      {
        dataField: "sex",
        style:{'width' : '150px'},
        text: "Sex",
        sort: true
      },
      {
        dataField: "age",
        style:{'width' : '150px'},
        text: "Age",
        sort: true
      },
        {
          dataField: "delete",
          style:{'width' : '150px'},
          text: "Delete"
        },
        {
          dataField: "edit",
          style:{'width' : '150px'},
          text: "Edit"
        }
    ];

    const datatest = this.props.users.data.map((user, id) => (
      {
          id: id,
          firstname: user.firstname,
          lastname: user.lastname,
          sex: user.sex,
          age: user.age,
          delete: 
          <button
          style={{color: 'black'}}
          type="button"
          onClick={() => this.handleDelete(id) }>
          Delete
        </button>,
        edit:
        <Link to={`/edit/${id}`}>
        <button style={{color: 'black'}}>
         Edit
        </button>
        </Link>
      }
  ) )
  if (this.props.users.error) {
    return <div>This was an error to get the data. </div>
  } else {
    return (
      <div className="container">
      <div className="row d-flex flex-column">
      <div>
            <h2>Users</h2> 
            <ToolkitProvider
              bootstrap4
              keyField="firstname"
              data={datatest}
              columns={columns}
              search
              >
                {props => (
                <div>
                  <SearchBar
                  srText={"Search: "}
                  {...props.searchProps}
                  />
                  <hr />
                  <BootstrapTable
                  {...props.baseProps}
                  filter={filterFactory()}
                  ref={ n => this.node = n }
                  pagination={ paginationFactory(
                    {
                    sizePerPageList:[{
                        text: '5', value: 5
                      },{
                        text: '10', value: 10
                      }]
                    }
                  )}
                  //noDataIndication="There is no users"
                  rowStyle={ { 'width' : '150px', textAlign: 'center' } }
                  striped
                  hover
                  condensed
                  />
                </div>
                )}
                </ToolkitProvider>
                <Link to="/add">
                  <button style={{color: 'black'}}>
                  Create New User
                  </button>
                </Link>
                

          </div>
          </div>
          </div>
               
    );
  }
  }
}





const mapStateToProps = state => ({
  users: state.userList,
  delete_users: state.deleteUser,
  update_users: state.editUser
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  deleteUsers: (data) => dispatch(deleteUsers(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);