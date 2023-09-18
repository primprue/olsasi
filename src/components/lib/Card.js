import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const Card = ({title, action, children, truncate}) =>(

    <div className="card blue-grey darken-1">
        <div className="card-content white-text">
        <span className="card-title">{title}</span>
        <p className={truncate ? 'truncate' :  ''}>{children}</p>
        </div>
        {action && 
            <div className="card-action">
            <Link to={action.href}>{action.label}</Link>
            </div>}
    </div>
);

Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    action: PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired

    }),
};

export default Card;




