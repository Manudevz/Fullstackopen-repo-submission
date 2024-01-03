/* eslint-disable react/prop-types */

export const PersonForm = ({handleNameChange, handleNameSubmit, handleNumberChange, newName, newNumber  }) => {
  return (
    <form>
        <div>
          <label htmlFor="name">name </label>
          <input placeholder='type your name' onChange={handleNameChange} value={newName} name='name' id='name' />
          <label htmlFor="number"> number </label>
          <input placeholder='type your number' onChange={handleNumberChange} value={newNumber} name='number' id='number' />
          <button onClick={handleNameSubmit} type="submit">add</button>
        </div>
      </form>
  )
}
