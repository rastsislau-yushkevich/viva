import Swiper from 'swiper';
import { Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';

export const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	centeredSlides: true,
	modules: [Keyboard, Mousewheel],
	keyboard: {
		enabled: true,
	},
	mousewheel: {
		enabled: true,
	},
});
