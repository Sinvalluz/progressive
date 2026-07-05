import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type HookFormControllerProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	placeholder: string;
	type: React.HTMLInputTypeAttribute;
	label: string;
	maxLength: number;
};

export default function HookFormController<T extends FieldValues>({
	name,
	control,
	placeholder,
	type,
	label,
	maxLength,
}: HookFormControllerProps<T>) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const isPassword = type === 'password';
	const inputType = isPassword && showPassword ? 'text' : type;
	const IconPassword = showPassword ? Eye : EyeClosed;
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel
						className='text-foreground'
						htmlFor={field.name}
					>
						{label}
					</FieldLabel>
					<div className='relative'>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder={placeholder}
							className='border-border'
							autoComplete='off'
							maxLength={maxLength}
							type={inputType}
						/>
						{isPassword && (
							<IconPassword
								className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer'
								width={18}
								onClick={() => setShowPassword(!showPassword)}
								onMouseDown={(e) => e.preventDefault()}
							/>
						)}
					</div>

					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
