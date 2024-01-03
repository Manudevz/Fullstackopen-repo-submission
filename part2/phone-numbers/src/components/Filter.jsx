
// eslint-disable-next-line react/prop-types
export const Filter = ({handleSearchChange, search}) => {
  return (
    <div>
        <label htmlFor="filter"></label>
        <input placeholder='search by name' onChange={handleSearchChange} value={search} type="text" className="text" />
      </div>
  )
}
