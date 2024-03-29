import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function IconCode({ width, height, fill }) {
	const logo = `
  <svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 21.1 21.1" style="enable-background:new 0 0 21.1 21.1;" xml:space="preserve">
<style type="text/css">
</style>
<path id="Caminho_5603" class="st0" d="M14.8,5.4V4.9c0-2.6-2.1-4.6-4.6-4.6S5.5,2.4,5.5,4.9v0.5h1V4.9c0-1,0.4-1.9,1.1-2.6
	c0.7-0.7,1.6-1.1,2.6-1.1c2,0,3.6,1.6,3.6,3.6v0.5L14.8,5.4z M11.7,14c0.1-0.2,0.2-0.5,0.2-0.8c0-0.9-0.7-1.5-1.5-1.5
	c-0.4,0-0.8,0.2-1.1,0.5c-0.3,0.3-0.5,0.7-0.4,1.1c0,0.3,0.1,0.5,0.2,0.8c0.1,0.2,0.3,0.4,0.5,0.5l-0.7,2.3h3.1l-0.8-2.3
	C11.3,14.4,11.5,14.2,11.7,14L11.7,14z M17.2,7.4c0.6,0.6,0.9,1.4,0.9,2.2v8.2c0,1.7-1.4,3.1-3.1,3.1H5.7c-1.7,0-3.1-1.4-3.1-3.1
	V9.6c0-1.7,1.4-3.1,3.1-3.1H15C15.8,6.5,16.6,6.8,17.2,7.4L17.2,7.4z"/>
</svg>
    `
	const IconCode = () => (
		<SvgXml xml={logo} width={width} height={height} fill={fill} />
	)
	return <IconCode />
}
