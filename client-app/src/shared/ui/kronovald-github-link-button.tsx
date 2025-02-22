import { Button } from "@/shared/ui/button"

import { KRONOVALD_GITHUB_URL } from "@/shared/const"
import { SiGithub } from "@icons-pack/react-simple-icons"

const KronovaldGithubLinkButton = () => (
    <Button size="icon" className="rounded-full">
        <a href={KRONOVALD_GITHUB_URL} target="_blank" rel="noreferrer">
            <SiGithub />
        </a>
    </Button>
)

export default KronovaldGithubLinkButton
