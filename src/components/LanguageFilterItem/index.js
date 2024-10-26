import './index.css'

const LanguageFilterItem = props => {
  const {filterDetails, updateFilterId, isActive} = props

  const {id, language} = filterDetails

  const onChangeFilter = () => {
    updateFilterId(id)
  }

  const applyStyle = isActive ? 'active-filter' : ''

  return (
    <li>
      <button
        className={`filter-icon ${applyStyle}`}
        type="button"
        onClick={onChangeFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
