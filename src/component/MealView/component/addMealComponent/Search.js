import search from "../../../../img/Search.svg"

const Search = ({ onChangeSearch }) => (
    <label class="relative block w-6/12">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 ">
            {/* <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">{Search}</svg> */}
            <img className="w-[24px] mr-2" src={search} alt="" />
        </span>
        <input class="rounded-20 placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-blue-50 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-blue-100 focus:ring-blue-100 focus:ring-1 sm:text-sm"
            placeholder="Search for ingredients..."
            type="text"
            name="search"
            onChange={onChangeSearch} />
    </label>
);

export default Search;