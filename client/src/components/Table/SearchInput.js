import React, { useState } from 'react'
import Input from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faTimes, faEllipsisH, faSearch} from "@fortawesome/free-solid-svg-icons";

function SearchInput(props) {
    const [localSearchValue, setLocalSearchValue] = useState("")
    const {type, onChange: setParentSearchValue} = props

    const resetFilter = () => {
        setLocalSearchValue("")
        setParentSearchValue("")
    }
    const reRenderDataTable = () => { window.location.reload() }
    const inputFieldChange = (e) => setLocalSearchValue(e.target.value)
    const clickOnIcon = () => setParentSearchValue(localSearchValue)
    const styles = {
        clickListener: {
            height: "40px",
            width: "50px",
            zIndex: "2",
            borderRadius: "20px",
            position: "absolute",
            top: "0",
            left: "0",
            cursor: "pointer",
        },
        search_field:{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }

    }

    return (
        <div style={styles.search_field}>
            <div style={styles.clickListener} onClick={clickOnIcon}></div>
            <div className="expand_icon_wrapper">
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>

            <Input type={type} icon={faSearch} value={localSearchValue} onChange={inputFieldChange} />
            <div className="actions">
                <div className="actions_icon_wrapper">
                <FontAwesomeIcon icon={faRedo} onClick={reRenderDataTable}/>
                <FontAwesomeIcon icon={faTimes} onClick={resetFilter}/>
                </div>
            </div>
        </div>
    )
}




export default SearchInput
