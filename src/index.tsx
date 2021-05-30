import './index.scss';
import React,{ forwardRef, useEffect, useState,  } from 'react';


type AutoTagsProps = {
	suggestions:[string],
	id:string,
	style:object,
	register:(value:string) => void,
	name:string,
	placeholder:string
}

const ReactAutoTags = forwardRef<any, AutoTagsProps>(({ suggestions, id, style, register, name, placeholder }:AutoTagsProps, ref) => {
	const [tags, setTags] = useState<string[]>([]);
	const [suggs, setSuggs] = useState<string[]>([]);
	const [value, setValue] = useState<string>('');
	const [input, setInput] = useState<string>('');
	const [completion, setCompletion] = useState<string[]>([]);

	useEffect(() => {
		setSuggs((suggs) => suggs && [...suggestions]);
	}, []);

	useEffect(() => {
		register && register(name);
	  }, [register]);

	const autocomplete = (val:string) => {
		if (val.length > 2) {
			const values = suggs?.filter((sg) => sg.includes(val));
			setCompletion((completion) => completion && [...values]);
		}
	};

	const onSelect = (sugg:string) => {
		setTags((tags:[string]) => [...tags, sugg]);
		setSuggs((suggs) => [...suggs?.filter((sug) => sug !== sugg)]);
		setCompletion((completion) => completion && []);
		setValue((value) => `${value}, ${sugg}`);
		setInput('');
	};

	const onDelete = (sugg:string) => {
		setSuggs((suggs) => [...suggs, sugg]);
		setTags((tags) => [...tags?.filter((sug) => sug !== sugg)]);
		const update = value?.split(`, ${sugg}`).join('');
		setValue((value) => value && update);
	};

	return (
		<div ref={ref} className='autotags' id={id} style={style}>
			{tags.map((tag) => (
				<Tag
					value={tag}
					onDelete={onDelete}
				/>
			))}
			<input name={name} type='hidden' value={value}/>
			<input
				type='text' className='autotags-input' value={input} onChange={(e) => {
					autocomplete(e.target.value);
					setInput(e.target.value);
				}} placeholder={placeholder}/>
			<div className='autocompletion'>
				{completion.map((val) => (
					<p
						className='suggestion'
						onClick={() => onSelect(val)}
					> {val} </p>
				))}
			</div>
		</div>
	);
});

type TagProps = {
	value:string,
	onDelete:(value:string) => void
}

const Tag = ({ value, onDelete}:TagProps) => (
	<div className='tags'>
		<p className='tag-title'>{value}</p>
		<button
			className='tag-cross'
			onClick={() => onDelete(value)}
			dangerouslySetInnerHTML={{ __html: 'X' }}
		/>
	</div>

);

export default ReactAutoTags;