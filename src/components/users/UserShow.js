import React from 'react';
import axios from 'axios';
import Technologies from '../../lib/Technologies';

import { Link } from 'react-router-dom';

class UserShow extends React.Component {

  state = {
    user: {},
    technologies: {
      frontend: [],
      backend: []
    }
  }


  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .then(() => {
        const frontendTechs = [];
        const backendTechs = [];
        Technologies.frontend.map(technology => {
          if(this.state.user.technologies.frontend.includes(technology.name)) frontendTechs.push(technology);
        });
        Technologies.backend.map(technology => {
          if(this.state.user.technologies.backend.includes(technology.name)) backendTechs.push(technology);
        });
        this.setState({ technologies: { frontend: frontendTechs, backend: backendTechs }}, () => console.log(this.state));
      });
  }

  render() {
    return(
      <div className="container">
        <h2 className="title">{this.state.user.jobTitle}</h2>
        <h2 className="subtitle">Summary</h2>
        <p>{this.state.user.summary}</p>
        <h2 className="subtitle">Frontend Skills</h2>
        <ul>
          {this.state.technologies.frontend.map((technology, i) =>
            <li key={i}>{technology.name}<i className={technology.icon}></i></li>
          )}
        </ul>
        <h2 className="subtitle">Backend Skills</h2>
        <ul>
          {this.state.technologies.backend.map((technology, i) =>
            <li key={i}>{technology.name}<i className={technology.icon}></i></li>
          )}
        </ul>
        <Link
          to={`/users/${this.state.user._id}/edit`}
          className="button is-primary">
          Edit
        </Link>
      </div>
    );
  }
}

export default UserShow;