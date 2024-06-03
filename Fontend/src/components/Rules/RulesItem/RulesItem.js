import './RulesItem.scss';

function RulesItem({ title, description }) {
    return (
        <div className="rules-item">
            <div className={'title'}>{title}</div>
            <div className={'line'}></div>
            <div className={'description'}>{description}</div>
        </div>
    );
}

export default RulesItem;
