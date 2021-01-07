import React, { Component } from 'react'

export default class StateLists extends Component {

    state = {
        sData: null,
        stateNames: [],
        DistrictListActive: [{ stateName: '', activeCase: '', confirmedCase: '', deceasedCase: '', recoveredCase: '' }]
    }
    async fetchData() {
        const res = await fetch('https://api.covid19india.org/state_district_wise.json');
        const datas = await res.json();

        return datas;
    }

    async componentDidMount() {
        const stateData = await this.fetchData();
        const stateNameArray = [];
        let totalActiveCaseNo = 0;
        let totalRecoveredCaseNo = 0;
        let totalCinfirmedCaseNo = 0;
        let totaldeceasedCaseNo = 0;


        this.setState({ SData: stateData });

        const setStateName = Object.keys(stateData).map((dData) => {

            stateNameArray.push(dData);
            totalRecoveredCaseNo = 0;
            totalActiveCaseNo = 0;
            totalCinfirmedCaseNo = 0;
            totaldeceasedCaseNo = 0;

            Object.keys(stateData[dData].districtData).map((distData) => {
                totalActiveCaseNo += stateData[dData].districtData[distData]["active"];
                totalRecoveredCaseNo += stateData[dData].districtData[distData]["recovered"];
                totalCinfirmedCaseNo += stateData[dData].districtData[distData]["confirmed"];
                totaldeceasedCaseNo += stateData[dData].districtData[distData]["deceased"];
            });
            this.setState({
                ...this.state,
                DistrictListActive: [...this.state.DistrictListActive,
                {
                    stateName: dData,
                    activeCase: totalActiveCaseNo,
                    recoveredCase: totalRecoveredCaseNo,
                    confirmedCase: totalCinfirmedCaseNo,
                    deceased: totaldeceasedCaseNo
                }
                ]
            })

        });

        this.setState({ stateNames: stateNameArray });
        // this.setState({ DistrictListActive: setDistActiveCount })




    }
    render() {


        if (this.state.SData == null) {
            return (<div>Loading</div>)
        }
        else {
            return (
                <div className="box">
                    <div className="headeer">
                        <div className="li-name">
                            State
                        </div>
                        <div className="li-each-val">
                            active cases
                        </div>
                        <div className="li-each-val">
                            Recovered cases
                        </div>
                        <div className="li-each-val">
                            Deceased case
                        </div>
                        <div className="li-each-val">
                            Confirmed Cases
                        </div>
                    </div>
                    <ul>
                        {
                            this.state.stateNames.map((e, i) => (
                                <li keys={i}>
                                    <div className="li-name">{e}</div>
                                    <div className="li-each-val">
                                        {/* active case  */}
                                        {this.state.DistrictListActive[i + 1].activeCase}
                                        {console.log(i)}
                                    </div>
                                    <div className="li-each-val">
                                        {/* Recovered case  */}
                                        {this.state.DistrictListActive[i + 1].recoveredCase}
                                        {console.log(i)}
                                    </div>
                                    <div className="li-each-val">
                                        {/* deceased case  */}
                                        {this.state.DistrictListActive[i + 1].deceased}
                                        {console.log(i)}
                                    </div>
                                    <div className="li-each-val">
                                        {/* confirmedCase    case  */}
                                        {this.state.DistrictListActive[i + 1].confirmedCase}
                                        {console.log(i)}
                                    </div>



                                </li>
                            ))
                        }
                    </ul>

                </div>
            )
        }

    }
}
