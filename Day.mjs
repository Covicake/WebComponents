export class Day extends HTMLElement {
    constructor()
    {
        super();

        this.day = this.getAttribute('day');
        this.week_day = this.getAttribute('week_day');
        this.isPastDay = this.getAttribute('past-day');
        this.isWeekend = this.getAttribute('is-weekend');
        console.log(this.isWeekend);

        let className = '';
        if (this.isPastDay)
        {
            className = 'past-day';
        }
        if (this.isWeekend == 'true')
        {
            className = 'weekend';
        }

        this.innerHTML = `
            <style>
                .day
                {
                    width: 60px;
                    height: 60px;
                    border: 1px solid silver;
                    padding: 10px;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                .day.past-day
                {
                    color: silver;
                }

                .day.weekend
                {
                    color: red;
                }

                .day .day-number
                {
                    font-size: 26px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .day .day-name
                {
                    font-size: 10px;
                }
            </style>
            <div class="day ${className}">
                <p class="day-number">${this.day}</p>
                <p class="day-name">${this.week_day}</p>
            </div>
        `;
    }

    connectedCallback()
    {
    }

    // static get observedAttributes()
    // {
    //     return ['nombre'];
    // }
    
    attributeChangedCallback(name, older, current)
    {
    }
}

customElements.define('c-day', Day);