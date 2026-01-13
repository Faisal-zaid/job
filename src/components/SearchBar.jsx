function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search jobs..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: "8px", width: "100%", marginBottom: "1rem" }}
    />
  );
}

export default SearchBar;
