import React, {Component} from 'react';
import hmImg from '../homepage/Img/hmImg.jpg';
import Select from "react-select";
import './searchResult.css';
import {Redirect} from 'react-router-dom';
import Spinner from '../Loader/Loader';

const counOptions = [{ value: 'in', label: 'India' },
                    { value: 'us', label: 'USA' },
                    { value: 'za', label: 'South Africa' },
                    { value: 'gb', label: 'United Kingdom' }
                ];

const catOptions = [{ value: 'business', label: 'Business' },
                 { value: 'entertainment', label: 'Entertainment' },
                 { value: 'health', label: 'Health' },
                 { value: 'science', label: 'Science' },
                 { value: 'sports', label: 'Sports' },
                 { value: 'technology', label: 'Technology' }
                ];
                
let countryName='';
let categoryName='';
let searchData=[];
let tempData = [];
let query = '';
class SearchResult extends Component{
    constructor(props){
        super(props);
        this.state={
            newsResult:[],
            loadStatus:false
        }
        this.onCatChange = this.onCatChange.bind(this);
        this.onCountChange = this.onCountChange.bind(this);
        this.getNewsFromFilter = this.getNewsFromFilter.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }
  
    componentWillUnmount(){
        query='';
        tempData=[];
    }
  
    onCountChange(e){
        countryName= e.value;
        this.getNewsFromFilter();
    }
    getNewsFromFilter=()=>{
        this.setState({loadStatus:true});
        let url='https://newsapi.org/v2/top-headlines?apiKey=7cc12d9020244490a14cf0a7a0c9282e&language=en';
        if(countryName!==''){
            url+='&country='+countryName;
        } 
        if(categoryName!==''){
            url+='&category='+categoryName;
        } 
        if(query!=='' ){
            url+='&q='+query;        
        }  
            fetch(url,{
                method : 'GET',
            }).then(response=>{return response.json();})
            .then((newsresponse)=>{
                searchData=newsresponse.articles;
                this.setState({loadStatus:false});
                searchData = searchData.filter(function (resultData) {
                    if (resultData.title in tempData) {
                        return false;
                    } else {
                        tempData[resultData.title] = true;
                        return true;
                    }
                });
                this.setState({newsResult:searchData});
            });
    }
    
    onCatChange(e){
        categoryName= e.value;
        this.getNewsFromFilter();
    }

    onButtonClick(){
        if(query!==undefined){
            this.props.location.state.searchParam='';
        }
        this.getNewsFromFilter();
    }
    
    render(){
        let redirect=null;
        if(this.props.location.state===undefined){
            redirect = <Redirect to = '/'/>
        }else{
            if(query!==this.props.location.state.searchParam){
                query=this.props.location.state.searchParam;
                this.getNewsFromFilter();
            }
    }

        return(
            <div>
                 {this.state.loadStatus?<Spinner/>:null}
                {redirect}
                <div style={{
                    backgroundImage: `url(${hmImg})`,
                    width: '100%',
                    height:'12%',
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    zIndex:'-10'
                }}></div>
                <div className="selectDiv">
                <div className="searchDropdownDiv">
                        <Select id="country"
                            className="searchDropdown"
                            value={counOptions.value}
                            options={counOptions}
                            placeholder="Select Country"
                            onChange={this.onCountChange}
                        />
                    </div>
                    <div className="searchDropdownDiv">
                        <Select id="category"
                            className="searchDropdown"
                            value={catOptions.value}
                            options={catOptions}
                            placeholder="Select Category"
                            onChange={this.onCatChange}
                        />
                    </div>
                    <div className="btnDiv">
                        <button className="btnStyle" onClick={this.onButtonClick}>Clear Search</button>
                    </div>
                    </div>
                <div>{
                    this.state.newsResult.map(function (result) {
                        return <div className="searchDataDiv" key={result.title}>
                            <div className="imgDiv">
                                <img className="imgStyle" alt="img" src={result.urlToImage} />
                            </div>
                            <div className="pDiv">
                                <p className="pStyle">{result.title}</p>
                                <p>{result.description}<a href={result.url} target="_blank" rel="noopener noreferrer">Read More...</a></p>
                            </div>
                        </div>
                    })
                }</div>
            </div>
        )
    }
}

export default SearchResult;
