import styles from './Input.module.css'
function Input({type, text, name, placeHolder, handleOnChange, value}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} name={name} placeholder={placeHolder} id={name} onChange={handleOnChange} value={value} />
        </div>
    )
}

export default Input