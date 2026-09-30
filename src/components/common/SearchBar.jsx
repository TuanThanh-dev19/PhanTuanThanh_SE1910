function SearchBar({ id, label, onChange, onClear, placeholder, value }) {
  return (
    <div className="search-field">
      <label htmlFor={id}>{label}</label>
      <div className="search-field__control">
        <span aria-hidden="true">⌕</span>
        <input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        {value && (
          <button type="button" onClick={onClear} aria-label="Clear search">
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
