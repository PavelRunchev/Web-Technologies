import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../shared/navigation/navigation.component';
import { MessageModel } from '../../messageModel';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
})
export class NewMessageComponent implements OnInit {
  messages: Array<MessageModel> = [];

  constructor(private nav: NavigationComponent) { 
    this.messages.push({ date: this.parseDate('30 November 2022'), author: 'Anna@abv.bg', description: "Hey George, thanks for shopping at Clothstore! We’ve got tons of exciting deals in our upcoming Fall Collection. Stay tuned or visit www.cstore.com to learn more." });
    this.messages.push({ date: this.parseDate('06 December 2022'), author: 'services@gmail.com', description: "Customer support texts differ from most other business text messages. While the goal of most other text messages is to inform the customer of something, customer service messages aim to help the customer with something. Use words that are polite and conversational to make your messages friendly and accessible. In case you’re responding to an issue they have, try and be genuinely apologetic. However, ensure that you don’t spend all your text messages apologizing. You’ll have to provide the customer with an actual solution for maximum customer satisfaction. You can also include freebies and discounts for the customer to compensate them for their troubles. This will show them that your organization really values them." });
    this.messages.push({ date: this.parseDate('12 December 2022'), author: 'admin@abv.bg', description: "Payment reminders can be tricky because it's easy to make them sound harsh. After all, you’re asking the customer to pay up — there’s no nice way to put it, right? Except, there is. Instead of harshly reminding the customer to pay up immediately, gently inform them about it. You shouldn’t try and force them — simply nudge them to pay. The key here is to ensure that your message doesn’t make them panic. While creating a sense of urgency can get a customer to act, it can also scare them. Your message should ease any concerns they have, remind them of what they owe and give them avenues to contact you in case they have queries. This way, they have the information they need to take action on your payment calmly." });
  }

  ngOnInit(): void { }

  unreadMessage(id: string): void {
    let el = document.getElementById(id);
    if(el['checked']) {
      this.nav.ngOnChanges(1);
    } else if(!el['checked']) {
      this.nav.ngOnChanges(-1);
    }
  }

  removeMessage(id: string): void {
    let el = document.querySelector(`#${id}`);
    if(el != null) el.remove();
  }

  parseDate(data: string): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(data);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = months[date.getMonth()];

    return `${day < 10 ? '0' + day : day} ${month} ${year}`;
  }
}