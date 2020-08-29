import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
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
    const handleSearchIconClick = () => console.log("click")
    const handlExpandIconClick = () => console.log("clack")
    
    useEffect(() => {
        setParentSearchValue(localSearchValue)
        return () => {
            setParentSearchValue("")
        }
    }, [localSearchValue, setParentSearchValue])

    const styles = {
        search_icon: {
            height: 40,
            width: 55,
            zIndex: 2,
            borderRadius: 20,
            position: "absolute",
            top: 0,
            left: 0,
            cursor: "pointer",  
        },
        expand_icon:{
            position: "absolute",
            top: 10,
            right: 15,
            zIndex: 2,
            color: "#030303",
            cursor: "pointer",
        },
        search_field:{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "relative",  
        },      
        icon:{
            fontSize: "20px"
        },
        input_wrapper:{
            position: "relative",
            marginLeft: 50,
            width: 450
        },
        reset_icon:{
            fontSize: 20,
            marginRight: 30,
            cursor: "pointer"
        }

    }

    return (
        <div style={styles.search_field}>        
            <div style={styles.input_wrapper}>
                <div style={styles.search_icon} onClick={handleSearchIconClick}></div>
                <Input type={type} height="40px" fullWidth icon={faSearch} value={localSearchValue} onChange={inputFieldChange} />
                <div style={styles.expand_icon} onClick={handlExpandIconClick}>
                    <FontAwesomeIcon icon={faEllipsisH} style={styles.icon} />
                </div>
            </div>
            <div className="actions">
                <div className="actions_icon_wrapper">
                    <FontAwesomeIcon style={styles.reset_icon} icon={faRedo} onClick={reRenderDataTable}/>
                    <FontAwesomeIcon style={styles.reset_icon} icon={faTimes} onClick={resetFilter}/>
                </div>
            </div>
        </div>
    )
}

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired
}


export default SearchInput
