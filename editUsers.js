import React from 'react';
import { connect } from "react-redux";
import { editUsers  } from "./redux/action-creators";
import { withRouter } from 'react-router'


class editNewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstname": '',
            "lastname": '',
            "sex": '',
            "age": '',
            "password": '',
            "repeat": '',
            "field":'',
            "recordpassword":'',
            "errorpassword":''
        }
    }

    componentDidMount() {
        const currentUser = this.props.users.data.find(
            (user, id) => Number(id) === Number(this.props.id) 
          );
        this.setState({"firstname":currentUser.firstname});
        this.setState({"lastname": currentUser.lastname});
        this.setState({"sex": currentUser.sex});
        this.setState({"age":currentUser.age});
        this.setState({"recordpassword":currentUser.password});

    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const newData = {
          "firstname": e.target[0].value,
          "lastname": e.target[1].value,
          "sex": e.target[2].value,
          "age": e.target[3].value,
          "password": e.target[4].value,
          "repeat": e.target[5].value
        };

        const editData = {
            id: this.props.id,
            data: newData
        }

        if (this.state.recordpassword !== newData.password) {
            this.setState({"errorpassword":"Error"});
          } else if (this.state.recordpassword === newData.password){
            this.props.editUsers(editData);
         }

        const currentId = this.props.id;
        let pageNumber = parseInt(currentId / 5) + 1;
        
        localStorage.setItem("Page", pageNumber);
        localStorage.setItem("Update", "on");
        
        };

    render() {
        return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 p-5 mx-auto shadow">
            <h3>Edit User</h3>
            <br />
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>First Name</label>
            <input
                className="form-control"
                type="text"
                placeholder="First name"
                value={this.state.firstname}
                onChange={(e) => this.setState({firstname: e.target.value})}
              />
            </div>
            <br />
            <div className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Last name"
                value={this.state.lastname}
                onChange={(e) => this.setState({lastname: e.target.value})}
              />
            </div>
            <br />
            <div className="form-group">
            <label>Sex</label>
              <input
                className="form-control"
                type="text"
                placeholder="Sex"
                value={this.state.sex}
                onChange={(e) => this.setState({sex: e.target.value})}
              />
            </div>
            <br />
            <div className="form-group">
            <label>Age</label>
              <input
                className="form-control"
                type="text"
                placeholder="Age"
                value={this.state.age}
                onChange={(e) => this.setState({age: e.target.value})}
              />
            </div>
            <br />
            <div className="form-group">
            <label>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({password: e.target.value})}
              />
            </div>
            <br />
            <div className="form-group">
            <label>Repeat</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={this.state.repeat}
                onChange={(e) => this.setState({repeat: e.target.value})}
              />
            </div>
            <br />
            {this.state.errorpassword.length > 0
            && <span>{<p style={{color:'red', fontVariant: "small-caps"}}>Password Error, Please Try Again</p>}</span>}
            <div className="form-group">
              <input
                className="btn btn-block btn-secondary"
                type="submit"
                value="Edit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
        )
    }
}

const mapStateToProps = state => ({
    update_users: state.editUser,
    users: state.userList
  });
  
  const mapDispatchToProps = dispatch => ({
    editUsers: (editData) => dispatch(editUsers(editData))
  });
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(editNewUser));