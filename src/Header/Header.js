import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import TiHomeOutline from 'react-icons/lib/ti/home-outline';
import './title.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getSearchresult = this.getSearchresult.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }
    getSearchresult(){
        const searchPar=document.getElementById('searchBox').value;
        if(searchPar!==""){
                const path = '/SearchResult';
                this.props.history.push({
                    pathname: path,
                    state: {searchParam: searchPar}
                });
        }
    }

    handleChange(e) {
        if(e.keyCode === 13){
            this.getSearchresult();
        }
    }

    routeChange(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="titleHeaderDiv" >
                <h3>AROUND THE GLOBE</h3>
                <span onClick={this.routeChange}><TiHomeOutline className="menuIcon" /></span>
                <div className="searchBox">
                    <input className="searchText"
                        id="searchBox"
                        type="text"
                        name="searchBox"
                        placeholder="Search"
                        onKeyDown={this.handleChange}
                    >
                    </input>
                    <span className="searchBtn" onClick={this.getSearchresult}>
                        <FaSearch />
                    </span>
                </div>
            </div>
        );
    }
}


export default Header;