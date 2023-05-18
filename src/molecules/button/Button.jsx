import PropTypes from 'prop-types';

const Button = (props) => {
  const { label, className, handleClick } = props;

  return (
    <>
      <button className={className} onClick={handleClick}>
        {label}
      </button>
    </>
  );
};

// Design Pattern Observer: https://refactoring.guru/es/design-patterns/observer
Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Button;
