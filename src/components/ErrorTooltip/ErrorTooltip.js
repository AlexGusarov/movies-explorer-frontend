import './ErrorTooltip.css';

function ErrorTooltip({ message }) {
  return (
    <div className='error-tooltip'>
      <p className='error-tooltip__message'>{message}</p>
    </div>
  )
}

export default ErrorTooltip;