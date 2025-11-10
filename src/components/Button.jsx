// src/components/Button.jsx

function Button({ text, color, onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: color,
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      {text}
    </button>
  );
}

export default Button;