export class Year extends HTMLElement {
    constructor()
    {
        super();

        this.year = this.getAttribute('year');
        this.render("2018");
        
    }

    connectedCallback()
    {
        const yearSelector = document.querySelector("#year-selector");
        yearSelector.addEventListener('change', (event) => {
            this.setAttribute("year", event.target.value);
        });
    }

    static get observedAttributes()
    {
        return ['year'];
    }
    
    attributeChangedCallback(name, older, current)
    {
        this.year = this.getAttribute('year');
        this.render();
    }

    render(initial = null)
    {
        const months = 12

        let monthsArr = [];
        for(let i = 1; i <= months; i++)
        {
            monthsArr.push(i);
        }
        let components = ``;
        monthsArr.forEach((element) => {
            let month = moment(this.year+'/'+element, 'YYYY/MM');

            const monthName = month.format('MMMM');
            components += `<c-month month-name="${monthName}" month-number="${element}" month-year="${this.year}"></c-month>`
        });
        this.innerHTML = `
            <style>
                .year > h2
                {
                    text-align: center;
                }
                .month-container
                {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    width: 100%;
                }
            </style>

            <div class="year-container">
                <select id="year-selector" value="${this.year}">
                    <option ${this.year == 2018? "selected=selected" : '' } value="2018">2018</option>
                    <option ${this.year == 2019? "selected=selected" : '' } value="2019">2019</option>
                    <option ${this.year == 2020? "selected=selected" : '' } value="2020">2020</option>
                    <option ${this.year == 2021? "selected=selected" : '' } value="2021">2021</option>
                </select>
                <div class="year">
                    <h2>${this.year}</h2>
                    <div class="month-container">
                        ${components}
                    </div>
                </div>
            </div>
        `;

        const yearSelector = document.querySelector("#year-selector");
        yearSelector.addEventListener('change', (event) => {
            this.setAttribute("year", event.target.value);
        });
    }
}

customElements.define('c-year', Year);