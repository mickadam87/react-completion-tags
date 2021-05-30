REACT_COMPLETION_TAGS

Just use it has classic input in your form. Complete suggestions props and register to retrieve selected tags as string in your form data.

```javascript
import Tags from "react-completion-tags"

export default function Form() {

    const inputRef = useRef()

    return(
        <form>
          <Tags
            name='fruits'
            id='my-fruit-input'
            register={register} // from React-Hook-Form for example
            ref={inputRef}
            suggestions=['apple','strawberry','peer']
            />
        </form>
    )
}
```
