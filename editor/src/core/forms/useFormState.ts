type FormState<TForm> = {
    data: TForm

}

type FormActions<TForm> = {
    setErrors: (errors: string[]) => void
    setValue: (name: string, value: any) => void
}

interface Props<TForm> {
    validate: (data: TForm) => string[]
    onSubmit: (form: FormState<TForm> & FormActions<TForm>) => void
}