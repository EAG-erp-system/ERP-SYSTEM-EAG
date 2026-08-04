
import SidebarItem from "./SidebarItem"

function SidebarSection( { title, items, isOpen, activeItem, onItemClick } ) {
    return (
        <div className="space-y-3">
            <div className={`px-2 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <p className="roboto-medium text-[11px] tracking-[0.24em] text-slate-500">{title}</p>
            </div>

            <div className="space-y-2">
                {items.map((item) => (
                    <SidebarItem 
                        key={item.id}
                        item={item}
                        isActive={activeItem === item.id}
                        isOpen={isOpen}
                        onItemClick={onItemClick}
                    />
                ))}
            </div>
        </div>
    )
}

export default SidebarSection