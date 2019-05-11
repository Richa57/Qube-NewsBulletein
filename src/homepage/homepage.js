import React, { Component } from 'react';
import './homepage.css';
import hmImg from './Img/hmImg.jpg';
import Select from "react-select";
import Spinner from '../Loader/Loader';

let topHeadlines = [];
let loadData = true;
const options = [{ value: 'in', label: 'India' },
                 { value: 'us', label: 'USA' },
                 { value: 'za', label: 'South Africa' },
                 { value: 'gb', label: 'United Kingdom' }]; 
class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
            counter: 0,
            loadStatus:false
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount() {
        this.setState({loadStatus:true});
        loadData=true;
        fetch('https://newsapi.org/v2/top-headlines?apiKey=7cc12d9020244490a14cf0a7a0c9282e&language=en', {
            method: 'GET',
        }).then(response => { return response.json(); })
            .then((newsresponse) => {
                topHeadlines = newsresponse.articles;
                this.setState({loadStatus:false});
                this.slide();
            });
            
    }

    componentWillUnmount(){
        loadData=false;
    }

    onChange(e){
        this.setState({loadStatus:true});
        const counName= e.value;
        loadData=true;
        fetch('https://newsapi.org/v2/top-headlines?apiKey=7cc12d9020244490a14cf0a7a0c9282e&language=en&country='+counName, {
            method: 'GET',
        }).then(response => { return response.json(); })
            .then((newsresponse) => {
                this.setState({loadStatus:false});
                topHeadlines = newsresponse.articles;
            });
    
    }

    slide = () => {
        let count = this.state.counter;
        let headLines = [];
        if (count === topHeadlines.length) {
            count = 0;
        }
        for (let i = count; i < count + 5 && i < topHeadlines.length; i++) {
            headLines.push(topHeadlines[i]);
        }
        if(loadData){
            this.setState({ news: headLines, counter: count + 5 });
            setTimeout(this.slide, 5000);
        }
    }



    render() {
        return (
            <div>
                {this.state.loadStatus?<Spinner/>:null}
                <div style={{
                    backgroundImage: `url(${hmImg})`,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    minHeight: '100vh',
                    top: '0px',
                    left: '0px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: '-10'
                }}></div>
                <div>
                    <div className="dropdownDiv">
                        <Select
                            className="countryDropdown"
                            value={options.value}
                            options={options}
                            placeholder="Select Country"
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="headlineBox">
                        <b>Top Headlines</b>
                        <div className="insideBox">
                            {
                                this.state.news.map(function (newsItem) {
                                    return <p key={newsItem.title}>{newsItem.title}</p>
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default Homepage;