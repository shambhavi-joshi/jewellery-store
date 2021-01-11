import React, { Component } from 'react';
import axios from 'axios';

export class Estimate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
            weight: 0,
            discount: 0,
            totalPrice: 0,
            disabledButton: false
        };
        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
    }

    handleRateChange(e) {
        this.setState({ rate: e.target.value });
    }

    handleWeightChange(e) {
        this.setState({ weight: e.target.value });
    }

    handleDiscountChange(e) {
        this.setState({ discount: e.target.value });
    }

    handleClick(e) {
        e.preventDefault();
        var apiBaseUrl = window.location.origin + '/api/';
        var self = this;
        var payload = {
            "rate": parseFloat(this.state.rate),
            "weight": parseFloat(this.state.weight),
            "discount": parseFloat(this.state.discount)
        }
        console.log(payload);
        axios.post(apiBaseUrl + 'estimate', payload)
            .then(function (response) {
                console.log(response.data);
                if (response.status == 200) {
                    console.log("Estimate successful.");
                    self.setState({
                        totalPrice: response.data.totalPrice
                    });
                }
                else if (response.status == 500) {
                    alert("Something went wrong.");
                    self.setState({
                        disabledButton: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }

    render() {
        let discountItem;
        const userType = localStorage.getItem("user_type");
        if (userType && userType == "2") {
            discountItem = <div className="form-group">
                <label>Discount %</label>
                <input type="number" className="form-control" min="0" max="2" onChange={this.handleDiscountChange} />
            </div>
        }

        return (
            <div>
                <h3>Estimate</h3>
                <form>
                    <div className="form-group">
                        <label>Gold Price (per gram)</label>
                        <input type="number" className="form-control" onChange={this.handleRateChange} required />
                    </div>
                    <div className="form-group">
                        <label>Weight (grams)</label>
                        <input type="number" className="form-control" onChange={this.handleWeightChange} required />
                    </div>
                    <div className="form-group">
                        <label>Total Price</label>
                        <input type="number" className="form-control txtTotalPrice" value={this.state.totalPrice} readOnly />
                    </div>
                    {discountItem}
                    <button type="submit" className="btn btn-primary btnEstimate"
                        disabled={this.state.disabledButton}
                        onClick={(event) => this.handleClick(event)}>Calculate</button>
                </form>
            </div>
        );
    }
}