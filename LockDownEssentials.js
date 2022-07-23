const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    PRODUCT: Symbol("product"),
    UPSELL: Symbol("upsell")
});

module.exports = class LockDownEssentials extends Order {
    constructor(sNumber, sUrl) {
        super(sNumber, sUrl);
        
        this.stateCur = OrderState.WELCOMING;
        
        this.sProduct = "";
        this.sUpSell = "";
        this.sCost = 0;
    
        this.sErrorProduct = 0;
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.PRODUCT;
                aReturn.push("Welcome to Maha's Home Hardware Store.");
                aReturn.push(`The list of Products offered are : 
                1. Anchors
                2. Fasteners
                3. Hammer
                4. Screws
                5. Nuts
                6. Padlocks
                7. Ladder
                8. Nails 
                Enter the product number/name of the product`);

                aReturn.push("To know more about, CLICK on the below link !");
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`); // Help page
                break;
            case OrderState.PRODUCT:
                this.stateCur = OrderState.UPSELL;
                switch (sInput.toLowerCase()) {

                    case '1':
                    case 'anchors':
                        this.sProduct = "Anchors"
                        this.sCost = 15;
                        break;

                    case '2':
                    case 'Fasteners':
                        this.sProduct = "Fasteners"
                        this.sCost = 18;
                        break;

                    case '3':
                    case 'hammer':
                        this.sProduct = "Hammer"
                        this.sCost = 19;
                        break;

                    case '4':
                    case 'screws':
                        this.sProduct = "Screws"
                        this.sCost = 14;
                        break;

                    case '5':
                    case 'nuts':
                        this.sProduct = "Nuts"
                        this.sCost = 10;
                        break;

                    case '6':
                    case 'padlocks':
                        this.sProduct = "Padlocks"
                        this.sCost = 8;
                        break;

                    case '7':
                    case 'ladder':
                        this.sProduct = "Ladder"
                        this.sCost = 19;
                        break;

                    case '8':
                    case 'nails':
                        this.sProduct = "Nails"
                        this.sCost = 13;
                        break;

                    default:
                        this.sErrorProduct = 999;
                        aReturn.push(` Please select a product number or product name`);
                        aReturn.push(`The list of Products offered are : 
                                1. Anchors
                                2. Fasteners
                                3. Hammer
                                4. Screws
                                5. Nuts
                                6. Padlocks
                                7. Ladder
                                8. Nails 
                                Enter the product number/name of the product`);
                        aReturn.push("To know more about them , CLICK on the below link !");
                        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
                        this.stateCur = OrderState.PRODUCT;
                }
                if (this.sErrorProduct == 0) {
                    aReturn.push(`Do you want to add a up-Sell item ?  
                1. Passage Sets
                2. Angles
                3. Dehumidifiers
                4. Humidifiers
                5. None
                Enter the item number or the name of the item`);
                }
                else {
                    this.sErrorProduct = 0;
                }
                break;


            case OrderState.UPSELL:
                switch (sInput.toLowerCase()) {

                    case '1':
                    case 'passage sets':
                        this.sUpSell = "Passage Sets"
                        this.sCost += 50;
                        break;

                    case '2':
                    case 'angles':
                        this.sUpSell = "Angles"
                        this.sCost += 50;
                        break;

                    case '3':
                    case 'dehumidifiers':
                        this.sUpSell = "Dehumidifiers"
                        this.sCost += 50;
                        break;

                    case '4':
                    case 'humidifiers':
                        this.sUpSell = "Humidifiers"
                        this.sCost += 50;
                        break;

                    case '5':
                    case 'none':
                        this.sUpSell = "None"
                        break;

                    default:
                        this.sUpSell = "None"
                }

                this.sCost = this.sCost + (this.sCost * 0.13); // Tax amount = 13 % 

                aReturn.push(`
                Order Details :-
                Product : ${this.sProduct} 
                Up-Sell item : ${this.sUpSell}
                Total Amount ( 13 % tax ) : ${this.sCost} $
                We will text you from 519-999-9999,
                when we are ready to meet you at curbside`);

                this.isDone(true);

                break;
        }
        return aReturn;
    }
    renderForm() {
        // your client id should be kept private
        return (`<html>

        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                .lst-kix_78qquc8jtgnx-0>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-0
                }
        
                .lst-kix_78qquc8jtgnx-6>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-6
                }
        
                ol.lst-kix_78qquc8jtgnx-5.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-5 0
                }
        
                .lst-kix_78qquc8jtgnx-7>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-7
                }
        
                ol.lst-kix_78qquc8jtgnx-2.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-2 0
                }
        
                ol.lst-kix_78qquc8jtgnx-3 {
                    list-style-type: none
                }
        
                .lst-kix_78qquc8jtgnx-4>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-4, lower-latin) ". "
                }
        
                ol.lst-kix_78qquc8jtgnx-4 {
                    list-style-type: none
                }
        
                ol.lst-kix_78qquc8jtgnx-1 {
                    list-style-type: none
                }
        
                ol.lst-kix_78qquc8jtgnx-2 {
                    list-style-type: none
                }
        
                ol.lst-kix_78qquc8jtgnx-7 {
                    list-style-type: none
                }
        
                ol.lst-kix_78qquc8jtgnx-8 {
                    list-style-type: none
                }
        
                .lst-kix_78qquc8jtgnx-1>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-1, lower-latin) ". "
                }
        
                .lst-kix_78qquc8jtgnx-5>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-5, lower-roman) ". "
                }
        
                ol.lst-kix_78qquc8jtgnx-5 {
                    list-style-type: none
                }
        
                ol.lst-kix_78qquc8jtgnx-6 {
                    list-style-type: none
                }
        
                .lst-kix_78qquc8jtgnx-0>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-0, decimal) ". "
                }
        
                .lst-kix_78qquc8jtgnx-8>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-8, lower-roman) ". "
                }
        
                .lst-kix_78qquc8jtgnx-1>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-1
                }
        
                .lst-kix_78qquc8jtgnx-6>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-6, decimal) ". "
                }
        
                ol.lst-kix_78qquc8jtgnx-0 {
                    list-style-type: none
                }
        
                .lst-kix_78qquc8jtgnx-7>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-7, lower-latin) ". "
                }
        
                ol.lst-kix_78qquc8jtgnx-3.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-3 0
                }
        
                .lst-kix_78qquc8jtgnx-2>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-2, lower-roman) ". "
                }
        
                ol.lst-kix_78qquc8jtgnx-6.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-6 0
                }
        
                .lst-kix_78qquc8jtgnx-3>li:before {
                    content: "" counter(lst-ctn-kix_78qquc8jtgnx-3, decimal) ". "
                }
        
                ol.lst-kix_78qquc8jtgnx-7.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-7 0
                }
        
                .lst-kix_g2mimjr3voy2-6>li:before {
                    content: "0025cf  "
                }
        
                .lst-kix_g2mimjr3voy2-7>li:before {
                    content: "0025cb  "
                }
        
                .lst-kix_78qquc8jtgnx-3>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-3
                }
        
                .lst-kix_g2mimjr3voy2-5>li:before {
                    content: "0025a0  "
                }
        
                .lst-kix_g2mimjr3voy2-3>li:before {
                    content: "0025cf  "
                }
        
                ol.lst-kix_78qquc8jtgnx-0.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-0 0
                }
        
                .lst-kix_g2mimjr3voy2-4>li:before {
                    content: "0025cb  "
                }
        
                ol.lst-kix_78qquc8jtgnx-4.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-4 0
                }
        
                .lst-kix_78qquc8jtgnx-4>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-4
                }
        
                .lst-kix_g2mimjr3voy2-8>li:before {
                    content: "0025a0  "
                }
        
                ol.lst-kix_78qquc8jtgnx-1.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-1 0
                }
        
                ul.lst-kix_g2mimjr3voy2-1 {
                    list-style-type: none
                }
        
                ul.lst-kix_g2mimjr3voy2-0 {
                    list-style-type: none
                }
        
                ul.lst-kix_g2mimjr3voy2-5 {
                    list-style-type: none
                }
        
                ul.lst-kix_g2mimjr3voy2-4 {
                    list-style-type: none
                }
        
                ul.lst-kix_g2mimjr3voy2-3 {
                    list-style-type: none
                }
        
                ol.lst-kix_78qquc8jtgnx-8.start {
                    counter-reset: lst-ctn-kix_78qquc8jtgnx-8 0
                }
        
                ul.lst-kix_g2mimjr3voy2-2 {
                    list-style-type: none
                }
        
                ul.lst-kix_g2mimjr3voy2-8 {
                    list-style-type: none
                }
        
                li.li-bullet-0:before {
                    margin-left: -18pt;
                    white-space: nowrap;
                    display: inline-block;
                    min-width: 18pt
                }
        
                ul.lst-kix_g2mimjr3voy2-7 {
                    list-style-type: none
                }
        
                ul.lst-kix_g2mimjr3voy2-6 {
                    list-style-type: none
                }
        
                .lst-kix_78qquc8jtgnx-8>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-8
                }
        
                .lst-kix_g2mimjr3voy2-1>li:before {
                    content: "0025cb  "
                }
        
                .lst-kix_78qquc8jtgnx-5>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-5
                }
        
                .lst-kix_g2mimjr3voy2-2>li:before {
                    content: "0025a0  "
                }
        
                .lst-kix_78qquc8jtgnx-2>li {
                    counter-increment: lst-ctn-kix_78qquc8jtgnx-2
                }
        
                .lst-kix_g2mimjr3voy2-0>li:before {
                    content: "  "
                }
        
                ol {
                    margin: 0;
                    padding: 0
                }
        
                table td,
                table th {
                    padding: 0
                }
        
                .c1 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 84.8pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c2 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 89.2pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c7 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 158.2pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }
        
                .c16 {
                    border-top-width: 0pt;
                    padding-left: 0pt;
                    border-top-style: solid;
                    margin-left: 72pt;
                    border-bottom-width: 0pt;
                    border-bottom-style: solid
                }
        
                .c0 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 15pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c8 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 15pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c5 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left;
                    height: 11pt
                }
        
                .c14 {
                    color: #000000;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 28pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c12 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.5;
                    orphans: 2;
                    widows: 2;
                    text-align: center
                }
        
                .c13 {
                    color: #000000;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 21pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c15 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .c17 {
                    color: #000000;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 14pt;
                    font-family: "Arial";
                    font-style: normal
                }
        
                .c4 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }
        
                .c18 {
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }
        
                .c3 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: center
                }
        
                .c10 {
                    background-color: #ffffff;
                    max-width: 468pt;
                    padding: 72pt 72pt 72pt 72pt
                }
        
                .c19 {
                    padding: 0;
                    margin: 0
                }
        
                .c9 {
                    font-size: 15pt
                }
        
                .c11 {
                    font-weight: 700
                }
        
                .c6 {
                    height: 0pt
                }
        
                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-size: 26pt;
                    padding-bottom: 3pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                .subtitle {
                    padding-top: 0pt;
                    color: #666666;
                    font-size: 15pt;
                    padding-bottom: 16pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }
        
                h1 {
                    padding-top: 20pt;
                    color: #000000;
                    font-size: 20pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-size: 16pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h3 {
                    padding-top: 16pt;
                    color: #434343;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h4 {
                    padding-top: 14pt;
                    color: #666666;
                    font-size: 12pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h5 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
        
                h6 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    font-style: italic;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
            </style>
        </head>
        
        <body class="c10">
            <p class="c12"><span class="c11 c14">HELP PAGE </span></p>
            <p class="c12"><span class="c11 c13">Welcome to Maha&rsquo;s Home Hardware Store</span></p>
            <p class="c12"><span class="c11 c17">Contact us - (519)999-9999</span></p>
            <p class="c5"><span class="c14 c11"></span></p>
            <p class="c15"><span class="c8">Product Details</span></p>
            <p class="c5"><span class="c8"></span></p><a id="t.d267b01343e2909b51495a3d9650d540d44e0bd2"></a><a id="t.0"></a>
            <table class="c18">
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c8">No.</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c3"><span class="c8">Product Name</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c3"><span class="c8">Price $</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">1</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Anchors</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">15</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">2</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Fasteners</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">18</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">3</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Hammer</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">19</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">4</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Screws</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">14</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">5</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Nuts</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">10</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">6</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Padlocks</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">8</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">7</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Ladder</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">19</span></p>
                    </td>
                </tr>
                <tr class="c6">
                    <td class="c1" colspan="1" rowspan="1">
                        <p class="c3"><span class="c0">8</span></p>
                    </td>
                    <td class="c7" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">Nails</span></p>
                    </td>
                    <td class="c2" colspan="1" rowspan="1">
                        <p class="c4"><span class="c0">13</span></p>
                    </td>
                </tr>
            </table>
            <p class="c5"><span class="c8"></span></p>
            <p class="c15"><span class="c0">Additional add-ons</span></p>
            <p class="c15"><span class="c9 c11">Up-Sell Items </span><span class="c9">( 50 $ each )</span></p>
            <ol class="c19 lst-kix_78qquc8jtgnx-0 start" start="1">
                <li class="c15 c16 li-bullet-0"><span class="c0">Passage Sets</span></li>
                <li class="c16 c15 li-bullet-0"><span class="c0">Angles</span></li>
                <li class="c16 c15 li-bullet-0"><span class="c0">Dehumidifiers</span></li>
                <li class="c16 c15 li-bullet-0"><span class="c9">Humidifiers</span></li>
            </ol>
        </body>
        
        </html>
         `);

    }
}
