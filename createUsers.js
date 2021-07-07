import React from 'react';
import { connect } from "react-redux";
import { createUser  } from "./redux/action-creators";


class createNewUser extends React.Component {
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
            "errors": ''
        }
    }


    handleValidation = () => {
      const { firstname ,lastname } = this.state;
      const firstnameMatch = !!firstname.match(/^[.,:!?]/);
      const lastnameMatch = !!lastname.match(/^[.,:!?]/);
      if (firstnameMatch || lastnameMatch) {
        this.setState({ errors: 'Field is not valid, can not have punctuation' });
      
      }
      else {
        this.setState({errors:""});
      }
  }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
          "firstname": e.target[0].value,
          "lastname": e.target[1].value,
          "sex": e.target[2].value,
          "age": e.target[3].value,
          "password": e.target[4].value,
          "repeat": e.target[5].value
        };
        console.log(data);
        this.props.createUser(data);

        console.log(this.props.total_users.data.length);
        const totalUsers = this.props.total_users.data.length;
        let pageNumber = parseInt(totalUsers / 5) + 1;
        //if ((totalUsers+1) % 5 === 0) pageNumber = pageNumber + 1;
        localStorage.setItem("Page", pageNumber);
        localStorage.setItem("Create", "on");
        };

    render() {
        return (
        <div className="container-fluid">
          <h3 className="text-center text-dark">Create New Users</h3>
          <div className="row">
            <div className="col-md-6 p-5 mx-auto shadow">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>First Name</label>
            <input
                className="form-control"
                type="text"
                placeholder="First name"
                value={this.state.firstname}
                onChange={(e) => {this.setState({firstname: e.target.value}); this.handleValidation()}}
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
                onChange={(e) => {this.setState({lastname: e.target.value}); this.handleValidation()}}
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
            {(this.state.errors !== '')
            ? <span style={{color: "red"}}>{this.state.errors}</span>
            : ''}
            <div className="form-group">
              <input
                className="btn btn-block btn-secondary"
                type="submit"
                value="Create New User"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
        );
    }
}

//export default createUser;

const mapStateToProps = state => ({
    users: state.createUser,
    total_users: state.userList
  });
  
  const mapDispatchToProps = dispatch => ({
    createUser: (data) => dispatch(createUser(data))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(createNewUser);