import React from 'react'
import { SvgXml } from 'react-native-svg'

export default function IconNumber({ width, height, fill }) {
	const logo = `
  <svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 21.1 21.1" style="enable-background:new 0 0 21.1 21.1;" xml:space="preserve">
<g>
	<path d="M2.8,8.7L2.8,8.7L1.6,9.3L1.4,8.2L3,7.5h1.2v6.2H2.8V8.7z"/>
	<path d="M8.2,13.6v-0.9L9,12c1.4-1.2,2-1.9,2-2.6c0-0.5-0.3-0.9-1-0.9C9.5,8.5,9,8.8,8.7,9L8.3,8c0.5-0.4,1.2-0.6,2-0.6
		c1.4,0,2.2,0.8,2.2,1.9c0,1-0.8,1.9-1.6,2.7l-0.6,0.5v0h2.3v1.2H8.2z"/>
	<path d="M15.6,12.2c0.3,0.1,0.8,0.4,1.4,0.4c0.8,0,1.1-0.4,1.1-0.8c0-0.6-0.6-0.9-1.2-0.9h-0.6v-1h0.6c0.5,0,1.1-0.2,1.1-0.7
		c0-0.4-0.3-0.6-0.9-0.6c-0.5,0-1,0.2-1.3,0.4l-0.3-1c0.4-0.2,1.1-0.5,1.9-0.5c1.3,0,2.1,0.7,2.1,1.5c0,0.7-0.4,1.2-1.1,1.4v0
		c0.7,0.1,1.3,0.7,1.3,1.5c0,1.1-1,1.9-2.5,1.9c-0.8,0-1.5-0.2-1.8-0.4L15.6,12.2z"/>
</g>
</svg>
    `
	const IconNumber = () => (
		<SvgXml xml={logo} width={width} height={height} fill={fill} />
	)
	return <IconNumber />
}
